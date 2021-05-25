package com.example.apptools.converter
import android.os.Build
import androidx.annotation.RequiresApi
import androidx.room.TypeConverter
import java.time.LocalDate

class MyConverters {


    @TypeConverter
     fun DateToString(value: LocalDate?): String {
        return value.toString()
    }


    @RequiresApi(Build.VERSION_CODES.O)
    fun StringToDate(value: String?): LocalDate? {
        return LocalDate.parse(value)
    }


}
