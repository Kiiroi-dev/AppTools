package com.example.apptools.ui.finance.data

import androidx.lifecycle.LiveData
import androidx.room.*

@Dao
interface EntityBudgetDao {
    @Insert(onConflict = OnConflictStrategy.IGNORE)
    suspend fun addBudget(budget: EntityBudget)

    @Query("SELECT * FROM `budget-table`")
    fun readAllData(): LiveData<List<EntityBudget>>

    @Delete
    suspend fun deleteBudget(entityBudget: EntityBudget)

    @Query("SELECT title FROM `budget-table`")
    fun loadTitleBudget():LiveData<List<String>>
}