package com.example.apptools.ui.finance.data

import androidx.lifecycle.LiveData
import com.example.apptools.ui.finance.data.EntityBudget
import com.example.apptools.ui.finance.data.EntityBudgetDao

class BudgetRepository(private val entityBudgetDao: EntityBudgetDao) {

    val readAllData: LiveData<List<EntityBudget>> = entityBudgetDao.readAllData()

    suspend fun addBudget(budget: EntityBudget){
        entityBudgetDao.addBudget(budget)
    }
    suspend fun deleteBudget(entityBudget: EntityBudget) {
        entityBudgetDao.deleteBudget(entityBudget)
    }

}