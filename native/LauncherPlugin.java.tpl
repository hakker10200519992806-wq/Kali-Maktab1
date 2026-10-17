package __PACKAGE__;

import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ShortcutInfo;
import android.content.pm.ShortcutManager;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.drawable.Icon;
import android.os.Build;
import android.util.Base64;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * Ilovaning bosh ekrandagi nomi va ikonkasini almashtirish.
 *  - setPreset: manifestdagi activity-alias lardan birini yoqadi (tayyor nom + ikonka)
 *  - pinShortcut: ixtiyoriy nom va rasm bilan bosh ekranga yorliq qo'yadi
 */
@CapacitorPlugin(name = "Launcher")
public class LauncherPlugin extends Plugin {

    private static final String[] IDS = { __IDS__ };

    private ComponentName alias(String id) {
        return new ComponentName(getContext().getPackageName(), "__PACKAGE__.Alias_" + id);
    }

    private boolean isEnabled(PackageManager pm, String id) {
        int s = pm.getComponentEnabledSetting(alias(id));
        if (s == PackageManager.COMPONENT_ENABLED_STATE_ENABLED) return true;
        if (s == PackageManager.COMPONENT_ENABLED_STATE_DEFAULT) return "default".equals(id);
        return false;
    }

    @PluginMethod
    public void getState(PluginCall call) {
        try {
            PackageManager pm = getContext().getPackageManager();
            String cur = "default";
            for (String id : IDS) {
                if (isEnabled(pm, id)) { cur = id; break; }
            }
            boolean canPin = false;
            if (Build.VERSION.SDK_INT >= 26) {
                ShortcutManager sm = getContext().getSystemService(ShortcutManager.class);
                canPin = sm != null && sm.isRequestPinShortcutSupported();
            }
            JSObject r = new JSObject();
            r.put("current", cur);
            r.put("canPin", canPin);
            call.resolve(r);
        } catch (Exception e) {
            call.reject("Holatni o'qib bo'lmadi: " + e.getMessage());
        }
    }

    @PluginMethod
    public void setPreset(PluginCall call) {
        String id = call.getString("id");
        boolean known = false;
        for (String x : IDS) {
            if (x.equals(id)) known = true;
        }
        if (!known) {
            call.reject("Noma'lum ikonka: " + id);
            return;
        }
        try {
            PackageManager pm = getContext().getPackageManager();
            // avval yangisini yoqamiz, keyin qolganlarini o'chiramiz: launcherda doim kirish nuqtasi bo'ladi
            pm.setComponentEnabledSetting(alias(id),
                    PackageManager.COMPONENT_ENABLED_STATE_ENABLED, PackageManager.DONT_KILL_APP);
            for (String x : IDS) {
                if (!x.equals(id)) {
                    pm.setComponentEnabledSetting(alias(x),
                            PackageManager.COMPONENT_ENABLED_STATE_DISABLED, PackageManager.DONT_KILL_APP);
                }
            }
            JSObject r = new JSObject();
            r.put("id", id);
            try {
                r.put("label", pm.getActivityInfo(alias(id), 0).loadLabel(pm).toString());
            } catch (Exception ignored) {
                // nom ixtiyoriy
            }
            call.resolve(r);
        } catch (Exception e) {
            call.reject("Almashtirib bo'lmadi: " + e.getMessage());
        }
    }

    @PluginMethod
    public void pinShortcut(PluginCall call) {
        if (Build.VERSION.SDK_INT < 26) {
            JSObject r = new JSObject();
            r.put("supported", false);
            call.resolve(r);
            return;
        }
        String name = call.getString("name", "Kali Maktab");
        if (name == null || name.trim().isEmpty()) name = "Kali Maktab";
        name = name.trim();
        String b64 = call.getString("icon");
        if (b64 == null || b64.isEmpty()) {
            call.reject("Rasm berilmagan");
            return;
        }
        try {
            Context ctx = getContext();
            ShortcutManager sm = ctx.getSystemService(ShortcutManager.class);
            if (sm == null || !sm.isRequestPinShortcutSupported()) {
                JSObject r = new JSObject();
                r.put("supported", false);
                call.resolve(r);
                return;
            }
            byte[] raw = Base64.decode(b64, Base64.DEFAULT);
            Bitmap src = BitmapFactory.decodeByteArray(raw, 0, raw.length);
            if (src == null) {
                call.reject("Rasm o'qilmadi");
                return;
            }
            Intent open = new Intent(ctx, getActivity().getClass());
            open.setAction(Intent.ACTION_MAIN);
            open.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            ShortcutInfo info = new ShortcutInfo.Builder(ctx, "custom_" + System.currentTimeMillis())
                    .setShortLabel(name)
                    .setLongLabel(name)
                    .setIcon(Icon.createWithAdaptiveBitmap(adaptive(src)))
                    .setIntent(open)
                    .build();
            boolean requested = sm.requestPinShortcut(info, null);
            JSObject r = new JSObject();
            r.put("supported", true);
            r.put("requested", requested);
            call.resolve(r);
        } catch (Exception e) {
            call.reject("Yorliq qo'shilmadi: " + e.getMessage());
        }
    }

    /** Rasmni adaptive ikonka (108dp) markaziga, ko'rinadigan 72dp joyga joylaydi. */
    private Bitmap adaptive(Bitmap src) {
        final int size = 432;
        int inner = Math.round(size * 72f / 108f);
        Bitmap out = Bitmap.createBitmap(size, size, Bitmap.Config.ARGB_8888);
        Canvas cv = new Canvas(out);
        int edge = src.getPixel(0, 0);
        if (Color.alpha(edge) < 255) edge = Color.WHITE;
        cv.drawColor(edge);
        Bitmap scaled = Bitmap.createScaledBitmap(src, inner, inner, true);
        cv.drawBitmap(scaled, (size - inner) / 2f, (size - inner) / 2f, null);
        return out;
    }
}
