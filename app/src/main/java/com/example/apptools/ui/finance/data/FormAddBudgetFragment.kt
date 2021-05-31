package com.example.apptools.ui.finance.data

import android.os.Build
import androidx.lifecycle.ViewModelProvider
import androidx.fragment.app.Fragment
import android.os.Bundle
import android.text.Editable
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.annotation.RequiresApi
import androidx.navigation.fragment.findNavController


import com.example.apptools.R
import com.example.apptools.ui.finance.ui.FormAddBudgetViewModel

import java.time.LocalDate
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.*

class FormAddBudgetFragment : Fragment() {


    private lateinit var mFormAddBudgetViewModel: FormAddBudgetViewModel


    @RequiresApi(Build.VERSION_CODES.O)
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
        val dateCreated: Calendar = Calendar.getInstance()
        val dateCreatedOK: LocalDate =
            LocalDateTime.ofInstant(dateCreated.toInstant(), dateCreated.getTimeZone().toZoneId())
                .toLocalDate()
        val dateCreatedStr = dateCreatedOK.toString()
        val dueDateOK: Editable? = dueDate?.text

        val df: DateTimeFormatter = DateTimeFormatter.ofPattern("dd-MM-yyyy")



        @RequiresApi(Build.VERSION_CODES.O)
        fun inputCheck(
            titleBudgetStr: String?,
            goalAmountStr: String?,
            fieldStr: String?,
            dueDateStr: String?,
            currentResourcesStr:String?
        ): Boolean {
            if (titleBudgetStr == "" || goalAmountStr =="" || fieldStr=="" || dueDateStr=="" || currentResourcesStr =="" ){
                Toast.makeText(requireContext(),"Please complete all the information",Toast.LENGTH_LONG).show()
                return false
            }

            return true
        }
        fun inputCheckInfos(
            titleBudgetStr: String?,
            goalAmountStr: String?,
            fieldStr: String?,
            dueDateStr: String?,
            currentResourcesStr: String?
        ): List<String?> {
            if (titleBudgetStr == "" || goalAmountStr == "" || fieldStr == "" || dueDateStr == "" || currentResourcesStr == "") {
                Toast.makeText(
                    requireContext(),
                    "Please complete all the information",
                    Toast.LENGTH_LONG
                ).show()

            }else{}

            return listOf(titleBudgetStr, goalAmountStr, fieldStr, dueDateStr, currentResourcesStr)
        }


        @RequiresApi(Build.VERSION_CODES.O)
         fun insertDatatoDatabase() {
            //Faire afficher le projet test dans la db via un bouton et Toast
            val fieldStr: String = field?.text.toString()
            val currentResourcesStr: String = currentResources?.text.toString()

            val goalAmountStr: String? = goalAmount?.text.toString()

            val titleBudgetStr: String = titleBudget?.text.toString()
            val dueDateStr: String = dueDateOK.toString()

            if (inputCheck(titleBudgetStr, goalAmountStr, fieldStr,dueDateStr,currentResourcesStr))
            {
                val dueDateLocalDate: LocalDate? = LocalDate.parse(dueDateStr, df)
                val currentResourcesDouble: Double = currentResourcesStr.toDouble()
                val goalAmountDouble: Double? = goalAmountStr?.toDouble()
                val budget = EntityBudget(
                    0,
                    titleBudgetStr,
                    dateCreatedOK,
                    dueDateLocalDate,
                    currentResourcesDouble,
                    goalAmountDouble,
                    fieldStr
                )
                mFormAddBudgetViewModel.addBudget(budget)
                Toast.makeText(
                    requireContext(),
                    "Budget ajouté mon bro, bien vu caaaaaaaaa! :D",
                    Toast.LENGTH_LONG
                ).show()
                findNavController().navigate(R.id.action_nav_formAddBudget_to_nav_finance)
            } else {

                Toast.makeText(
                    requireContext(),inputCheckInfos(titleBudgetStr, goalAmountStr, fieldStr,dueDateStr,currentResourcesStr).toString()
                    ,
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