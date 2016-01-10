package fr.omegasolutions.plugin;

import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;

import android.view.WindowManager;
import android.view.Window;
import android.view.View;
import android.graphics.PixelFormat;
import android.view.Gravity;
import android.view.ViewGroup;
import fr.omegasolutions.plugin.CustomViewGroup;
import android.content.Context;

public class Sbd extends CordovaPlugin {

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {


        super.initialize(cordova, webView);

        WindowManager manager = ((WindowManager) cordova.getActivity().getApplicationContext()
            .getSystemService(Context.WINDOW_SERVICE));

        WindowManager.LayoutParams localLayoutParams = new WindowManager.LayoutParams();
        localLayoutParams.type = WindowManager.LayoutParams.TYPE_SYSTEM_ERROR;
        localLayoutParams.gravity = Gravity.TOP;
        localLayoutParams.flags = WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE|

                    // this is to enable the notification to recieve touch events
                    WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL |

                    // Draws over status bar
                    WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN;

            localLayoutParams.width = WindowManager.LayoutParams.MATCH_PARENT;
            localLayoutParams.height = (int) (30 * cordova.getActivity().getResources()
                    .getDisplayMetrics().scaledDensity);
            localLayoutParams.format = PixelFormat.TRANSPARENT;

            CustomViewGroup view = new CustomViewGroup(cordova.getActivity().getApplicationContext());

            manager.addView(view, localLayoutParams);

    }
}
