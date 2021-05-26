package com.example.apptools.ui.finance

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.navigation.fragment.findNavController
import com.example.apptools.R
import com.example.apptools.databinding.FragmentFinanceBinding
import com.example.apptools.ui.finance.ui.FinanceViewModel
import com.google.android.material.floatingactionbutton.FloatingActionButton

class FinanceFragment : Fragment(R.layout.fragment_finance) {

    private lateinit var financeViewModel: FinanceViewModel
    private var _binding: FragmentFinanceBinding? = null


    // This property is only valid between onCreateView and
    // onDestroyView.

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val view = inflater.inflate(R.layout.fragment_finance, container, false)
        var btnAddBudget: FloatingActionButton? = view?.findViewById(R.id.floatingActionButton)
        btnAddBudget?.setOnClickListener {
            findNavController().navigate(R.id.action_nav_finance_to_nav_formAddBudget)
        }
        return view

    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}