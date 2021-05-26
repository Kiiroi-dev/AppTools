package com.example.apptools.ui.finance

import android.app.Application
import android.view.ViewGroup
import android.widget.HorizontalScrollView
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.RelativeLayout
import androidx.lifecycle.*
import androidx.room.Database
import com.example.apptools.R
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
    private val readAllData : LiveData<List<EntityBudget>>
    private val repository : BudgetRepository
    val text: LiveData<String> = _text
    init {
        val budgetDao = AppDatabase.getDatabase(application).EntityBudgetDao()
        repository = BudgetRepository(budgetDao)
        readAllData = repository.readAllData
    }


    fun addBudget(budget: EntityBudget){
        viewModelScope.launch (Dispatchers.IO){
            repository.addBudget(budget)
        }
    }
}