package com.example.apptools.ui.finance.data

import android.content.Context
import androidx.room.*
import com.example.apptools.Tools.MyConverters

@Database(entities = arrayOf(EntityBudget::class), version = 1, exportSchema = false)
@TypeConverters(MyConverters::class)
abstract class AppDatabase : RoomDatabase() {
    abstract fun EntityBudgetDao(): EntityBudgetDao

    companion object{
        @Volatile
        private var INSTANCE: AppDatabase?= null

        fun getDatabase(context: Context): AppDatabase{
            val tempInstance = INSTANCE
            if(tempInstance != null){
                return tempInstance
            }
            synchronized(this){
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    "budget_database"
                ).build()
                INSTANCE = instance
                return instance
            }
        }
    }
}