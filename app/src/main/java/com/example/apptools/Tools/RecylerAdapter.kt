package com.example.apptools.Tools

import android.annotation.SuppressLint
import android.content.Context
import android.content.Intent
import android.media.Image
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.EditText
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.example.apptools.Budget
import com.example.apptools.R
import com.example.apptools.ui.finance.data.EntityBudget
import com.example.apptools.ui.finance.data.ModelCardView
import com.example.apptools.ui.finance.ui.FormAddBudgetViewModel
import org.w3c.dom.Text

class RecyclerAdapter(val budgetList: ArrayList<ModelCardView>, val context: Context) : RecyclerView.Adapter<RecyclerAdapter.MyViewHolder>() {
        private var imageList = listOf<Int>(R.drawable.main_eau_nature,R.drawable.nature_verte,R.drawable.nature_automne)

     class MyViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

         var image: TextView = itemView.findViewById(R.id.item_image)
         var textTitle: TextView = itemView.findViewById(R.id.cardTitle)
        fun bindItems(modelCardView: ModelCardView){
            textTitle.text = modelCardView.titleCardView
            image.setBackgroundResource(modelCardView.image)
        }

         init {

        }

    }
    override fun onCreateViewHolder(viewGroup: ViewGroup, i: Int): MyViewHolder {
        val v = LayoutInflater.from(viewGroup.context)
            .inflate(R.layout.card_view_finance, viewGroup, false)
        return MyViewHolder(v)
    }
    override fun onBindViewHolder(holder: MyViewHolder, position: Int) {
    holder.bindItems(budgetList[position])


    }

    override fun getItemCount(): Int {
        return budgetList.size
    }






}