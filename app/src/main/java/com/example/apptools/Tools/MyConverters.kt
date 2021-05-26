package com.example.apptools.converter
import android.os.Build
import androidx.annotation.RequiresApi
import androidx.room.TypeConverter
import java.time.LocalDate

class MyConverters {

    companion object {
        @TypeConverter
       @JvmStatic
        fun toString(value: LocalDate): String {
            return value.toString()
        }


        @RequiresApi(Build.VERSION_CODES.O)
        @TypeConverter
        @JvmStatic
        fun fromLocalDate(value: String): LocalDate {
            return LocalDate.parse(value)
        }


    }
}
