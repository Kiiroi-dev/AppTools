package com.example.apptools.ui.finance.ui

import android.app.Application
import androidx.lifecycle.*
import com.example.apptools.ui.finance.data.AppDatabase
import com.example.apptools.ui.finance.data.BudgetRepository
import com.example.apptools.ui.finance.data.EntityBudget
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch


class FinanceViewModel(application: Application) : AndroidViewModel(application)
{

    private val _text = MutableLiveData<String>().apply {
        value = "This is finance Fragment"
    }
    //private val readAllData : LiveData<List<EntityBudget>>
    private val repository : BudgetRepository
    val text: LiveData<String> = _text
    init {
        val budgetDao = AppDatabase.getDatabase(application).EntityBudgetDao()
        repository = BudgetRepository(budgetDao)
        //readAllData = repository.readAllData
    }


    fun addBudget(budget: EntityBudget){
        viewModelScope.launch (Dispatchers.IO){
            repository.addBudget(budget)
        }
    }
}