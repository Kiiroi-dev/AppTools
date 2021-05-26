package com.example.apptools.ui.finance.ui

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.viewModelScope
import com.example.apptools.ui.finance.data.AppDatabase
import com.example.apptools.ui.finance.data.BudgetRepository
import com.example.apptools.ui.finance.data.EntityBudget
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class FormAddBudgetViewModel(application: Application): AndroidViewModel(application) {

    //private val readAllData: LiveData<List<EntityBudget>>
    private val repository: BudgetRepository

    init {
        val budgetDao = AppDatabase.getDatabase(application).EntityBudgetDao()
        repository = BudgetRepository(budgetDao)
        //readAllData = repository.readAllData
    }


    fun addBudget(budget: EntityBudget) {
        viewModelScope.launch(Dispatchers.IO) {
            repository.addBudget(budget)
        }
    }
}