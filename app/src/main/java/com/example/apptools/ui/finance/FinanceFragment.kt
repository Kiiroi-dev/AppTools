package com.example.apptools.ui.finance

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.apptools.R
import com.example.apptools.Tools.RecyclerAdapter
import com.example.apptools.databinding.FragmentFinanceBinding
import com.example.apptools.ui.finance.data.EntityBudget
import com.example.apptools.ui.finance.ui.FinanceViewModel
import com.google.android.material.floatingactionbutton.FloatingActionButton

class FinanceFragment : Fragment(R.layout.fragment_finance) {

    private lateinit var financeViewModel: FinanceViewModel




    // This property is only valid between onCreateView and
    // onDestroyView.

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        val recyclerView: RecyclerView? = view?.findViewById(R.id.recycler_view)
        val adapter = RecyclerAdapter()
        recyclerView?.adapter = adapter
        recyclerView?.layoutManager = LinearLayoutManager(requireContext())


        financeViewModel = ViewModelProvider(this).get(FinanceViewModel::class.java)
        financeViewModel.readAllData.observe(viewLifecycleOwner, Observer {EntityBudget ->
            adapter.setData(EntityBudget)
        } )

        val view = inflater.inflate(R.layout.fragment_finance, container, false)
        var btnAddBudget: FloatingActionButton? = view?.findViewById(R.id.floatingActionButton)
        btnAddBudget?.setOnClickListener {
            findNavController().navigate(R.id.action_nav_finance_to_nav_formAddBudget)
        }

        return view

    }


}