package com.example.apptools.ui.finance.data

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey
import java.time.LocalDate

@Entity(tableName = "budget-table")
data class EntityBudget(
    @PrimaryKey(autoGenerate = true) val uid: Int,
    @ColumnInfo(name = "title") val title: String,
    @ColumnInfo(name = "dateCreated") val dateCreated: LocalDate,
    @ColumnInfo(name = "dateDue") val dateDue: LocalDate?,
    @ColumnInfo(name= "currentResources") val currentResources: Double?,
    @ColumnInfo(name = "goalAmount") val goalAmount: Double?,
    @ColumnInfo(name = "field") val field: String?,
)