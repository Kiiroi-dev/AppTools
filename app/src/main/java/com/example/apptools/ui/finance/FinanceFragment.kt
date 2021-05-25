package com.example.apptools.ui.finance

import android.graphics.drawable.Drawable
import android.media.Image
import android.os.Bundle
import android.text.Layout
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.example.apptools.R
import com.example.apptools.databinding.FragmentFinanceBinding

class FinanceFragment : Fragment(R.layout.fragment_finance) {

    private lateinit var financeViewModel: FinanceViewModel
    private var _binding: FragmentFinanceBinding? = null


    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val root: View = binding.root
        return root

    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}