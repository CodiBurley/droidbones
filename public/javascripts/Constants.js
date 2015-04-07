var CONSTANT = (function() {

	var _fronts = {
		"LAYOUT":
			 '&lt!-- LAYOUT --&gt<br>'
			+'&ltLinearLayout xmlns:android="http://schemas.android.com/apk/res/android"<br>'
    			+'xmlns:tools="http://schemas.android.com/tools"<br>'
    			+'android:layout_width="match_parent"<br>'
    			+'android:layout_height="match_parent"<br>'
    			+'android:orientation="vertical"&gt<br>',
    	"ROW":
    		 '&lt!-- ROW --&gt<br>'
    		+'&ltLinearLayout<br>'
        		+'android:orientation="horizontal"<br>'
        		+'android:layout_width="match_parent"<br>'
        		+'android:layout_height="0dp"<br>'
        		+'android:layout_weight="1"&gt<br>',
        "COLUMN":
        	  '&lt!-- COLUMN --&gt<br>'
        	 +'&ltLinearLayout<br>'
	            +'android:orientation="vertical"<br>'
	            +'android:layout_width="0dp"<br>'
	            +'android:layout_height="match_parent"<br>'
	            +'android:layout_weight="1"&gt<br>',
	    "BUTTON":''
	};

	var _backs = {
		"LAYOUT": '&lt/LinearLayout&gt<br>',
		"ROW": '&lt/LinearLayout&gt<br>',
		"COLUMN": '&lt/LinearLayout&gt<br>',
		"BUTTON":
				'&lt!-- BUTTON --&gt<br>'
	    	    +'&ltButton<br>'
	                +'android:layout_width="match_parent"<br>'
	                +'android:layout_height="match_parent"<br>'
	                +'android:text="New Button"/&gt<br>'		
	};

	return {
		fronts: _fronts,
		backs: _backs
	};

})();