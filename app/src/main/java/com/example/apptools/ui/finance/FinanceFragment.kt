package com.example.apptools.ui.finance

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModelProvider
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.apptools.R
import com.example.apptools.Tools.RecyclerAdapter
import com.example.apptools.databinding.FragmentFinanceBinding
import com.example.apptools.ui.finance.data.AppDatabase
import com.example.apptools.ui.finance.data.EntityBudget
import com.example.apptools.ui.finance.data.EntityBudgetDao
import com.example.apptools.ui.finance.data.ModelCardView
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
        val model: FinanceViewModel by viewModels()
        val arrayList = ArrayList<ModelCardView>()
        val entityBudgetDao: EntityBudgetDao = AppDatabase.getDatabase(requireContext()).EntityBudgetDao()
        val arrayImage:ArrayList<Int> = arrayListOf(R.drawable.main_eau_nature,R.drawable.nature_automne,R.drawable.nature_verte)
        val CardViewObserver = Observer<String> { ReadData ->
            // Update the UI, in this case, a TextView.
            val arrayTitle = entityBudgetDao.loadTitleBudget()

            var j = 0
            for (i in 0..(arrayTitle.value?.size!!)){
                if(i%arrayImage.size==0){

                    j=0

                }
                arrayList.add(ModelCardView(arrayTitle.value?.get(i),arrayImage[j]))
                j++
            }
        }
        model.currentBudget.observe(requireActivity(),CardViewObserver)


        val recyclerView: RecyclerView? = view?.findViewById(R.id.recycler_view)
        val adapter = RecyclerAdapter(arrayList,requireContext())
        recyclerView?.adapter = adapter
        recyclerView?.layoutManager = LinearLayoutManager(requireContext())




        val view = inflater.inflate(R.layout.fragment_finance, container, false)
        var btnAddBudget: FloatingActionButton? = view?.findViewById(R.id.floatingActionButton)
        btnAddBudget?.setOnClickListener {
            findNavController().navigate(R.id.action_nav_finance_to_nav_formAddBudget)
        }

        return view

    }


}