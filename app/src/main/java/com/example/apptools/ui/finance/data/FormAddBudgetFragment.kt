package com.example.apptools.ui.finance.data

import android.os.Build
import androidx.lifecycle.ViewModelProvider
import androidx.fragment.app.Fragment
import android.os.Bundle
import android.text.Editable
import android.text.TextUtils
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.navigation.fragment.findNavController


import com.example.apptools.R
import com.example.apptools.ui.finance.ui.FinanceViewModel
import com.example.apptools.ui.finance.ui.FormAddBudgetViewModel

import java.time.LocalDate
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.*

class FormAddBudgetFragment : Fragment() {


    private lateinit var mFormAddBudgetViewModel: FormAddBudgetViewModel


    @RequiresApi(Build.VERSION_CODES.N)
    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {

        val view = inflater.inflate(R.layout.fragment_form_add_budget, container, false)
        mFormAddBudgetViewModel = ViewModelProvider(this).get(FormAddBudgetViewModel::class.java)

        val titleBudget: EditText? = view?.findViewById(R.id.titleBudget)
        val goalAmount: EditText? = view?.findViewById(R.id.goalAmount)
        val currentResources: EditText? = view?.findViewById(R.id.currentRessources)
        val field: EditText? = view?.findViewById(R.id.field)
        val dueDate: EditText? = view?.findViewById(R.id.dueDate)
        val dateCreated: Calendar = java.util.Calendar.getInstance()
        val dateCreatedOK: LocalDate =
            LocalDateTime.ofInstant(dateCreated.toInstant(), dateCreated.getTimeZone().toZoneId())
                .toLocalDate()
        val dateCreatedStr = dateCreatedOK.toString()

        @RequiresApi(Build.VERSION_CODES.O)
        fun inputCheck(
            titleBudgetOK: String,
            goalAmountOK: String?,
            fieldOK: String,
            dateCreatedStr: String
        ): Boolean {
            return !(TextUtils.isEmpty(titleBudgetOK) && TextUtils.isEmpty(dateCreatedStr) && TextUtils.isEmpty(
                goalAmountOK
            ) && TextUtils.isEmpty(fieldOK))
        }
        /*if (inputCheck(titleBudgetOK, goalAmountStr, fieldStr, dateCreatedStr)) {
            btnValidateBudget?.isEnabled = true
        }*/


        @RequiresApi(Build.VERSION_CODES.O)
         fun insertDatatoDatabase() {
            val dueDateOK: Editable? = dueDate?.text
            val dueDateStr = dueDateOK.toString()
            val df: DateTimeFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy")

            val dueDateLocalDate: LocalDate = LocalDate.parse(dueDateStr, df)
            val fieldStr: String = field?.text.toString()
            val currentResourcesStr: String = goalAmount?.text.toString()
            val currentResourcesDouble: Double = currentResourcesStr.toDouble()
            val goalAmountStr: String? = goalAmount?.text.toString()
            val goalAmountDouble: Double? = goalAmountStr?.toDouble()
            val titleBudgetOK: String = titleBudget?.text.toString()

            if (inputCheck(titleBudgetOK, goalAmountStr, fieldStr, dateCreatedStr)) {
                val budget = EntityBudget(
                    0,
                    titleBudgetOK,
                    dateCreatedOK,
                    dueDateLocalDate,
                    currentResourcesDouble,
                    goalAmountDouble,
                    fieldStr
                )
                mFormAddBudgetViewModel.addBudget(budget)
                Toast.makeText(
                    requireContext(),
                    "Budget ajouté mon bro, bien vu caaaaaaaaa!",
                    Toast.LENGTH_LONG
                ).show()
                findNavController().navigate(R.id.action_nav_formAddBudget_to_nav_finance)
            } else {
                Toast.makeText(
                    requireContext(),
                    "Rempli tous les champs obligatoires!",
                    Toast.LENGTH_LONG
                ).show()
            }

        }
        val btnValidateBudget: Button? = view?.findViewById(R.id.btn_validate_budget)
        btnValidateBudget?.setOnClickListener {
            insertDatatoDatabase()
        }






        /*
        val c = Calendar.getInstance()
        val year = c.get(Calendar.YEAR)
        val month = c.get(Calendar.MONTH)
        val day = c.get(Calendar.DAY_OF_MONTH)

        val btnPickDate: Button? = view?.findViewById(R.id.buttonPickDate)
        btnPickDate?.setOnClickListener {
            val dpd = activity?.let { it1 ->
                DatePickerDialog(it1,android.R.style.Theme_Holo_Dialog_NoActionBar_MinWidth,DatePickerDialog.OnDateSetListener { view, year, month, dayOfMonth ->
                    dueDate?.setText(""+dayOfMonth+"/"+month+"/"+year)
                },year,month,day)
            }
                dpd?.show()
                }*/
        return view

    }
}