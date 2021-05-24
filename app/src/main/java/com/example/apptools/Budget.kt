package com.example.apptools

import android.os.Build
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.annotation.RequiresApi
import java.time.LocalDate
import java.time.format.DateTimeFormatter
import java.util.*

class Budget (var title: String,
              var date_created: LocalDate,
              var date_due: LocalDate?,
              var budget: Double?,
              var field: String) {
    var tab_project: MutableList<Budget> = mutableListOf()

    @RequiresApi(Build.VERSION_CODES.O)
    fun DatetoFormat(date: Date): LocalDate {
        var string = date.year.toString() +"-"+ date.month.toString()+"-" + date.date.toString()

        return LocalDate.parse(string, DateTimeFormatter.ISO_DATE)
    }

   /* fun CollectDataFormBudget() {



        var sendBudgetButton: Button? = findViewById(R.id.buttonSendBudget)

        sendBudgetButton?.setOnClickListener {

            var Title: EditText? = view?.findViewById(R.id.textTitle)
            var TitleOk = Title.toString()


            var created_date: LocalDate = LocalDate.now()

            var dueDate: EditText? = view?.findViewById(R.id.dueDate)
            var dueDateString = dueDate.toString()
            val dueDateOK = LocalDate.parse(dueDateString, DateTimeFormatter.ISO_DATE)





            var field: EditText? = view?.findViewById(R.id.textField)
            var fieldOk = field.toString()

            var budget: Double? = view?.findViewById(R.id.numBudget)

            var pTest: Project = Project(TitleOk, created_date, dueDateOK, budget, fieldOk)
            val toast: Toast = Toast.makeText(activity, "Votre Projet est : " + pTest.title + "et votre budget est : " + pTest.budget,
                Toast.LENGTH_LONG)
            toast.show()
        }

    }*/

}