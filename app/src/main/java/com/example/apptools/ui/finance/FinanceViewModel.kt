package com.example.apptools.ui.finance

import android.app.Application
import android.view.ViewGroup
import android.widget.HorizontalScrollView
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.RelativeLayout
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.example.apptools.R


class FinanceViewModel() : ViewModel() {

    private val _text = MutableLiveData<String>().apply {
        value = "This is finance Fragment"
    }
    val text: LiveData<String> = _text

}