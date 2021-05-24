package com.example.apptools.ui.finance

import android.graphics.drawable.Drawable
import android.media.Image
import android.os.Bundle
import android.text.Layout
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.*
import androidx.fragment.app.Fragment
import androidx.lifecycle.Observer
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.example.apptools.R
import com.example.apptools.databinding.FragmentFinanceBinding

class FinanceFragment : Fragment(R.layout.fragment_finance) {

    private lateinit var financeViewModel: FinanceViewModel
    private var _binding: FragmentFinanceBinding? = null


    // This property is only valid between onCreateView and
    // onDestroyView.
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater,
        container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {

        // Variables
        financeViewModel =
            ViewModelProvider(this).get(FinanceViewModel::class.java)
        _binding = FragmentFinanceBinding.inflate(inflater, container, false)
        val root: View = binding.root
        val relativeLayout: RelativeLayout = binding.scrollViewFinance
        val linearLayout = LinearLayout(activity)
        val horizontalScrollView = HorizontalScrollView(activity)
        val linearParams = LinearLayout.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.WRAP_CONTENT)
            linearLayout.layoutParams = linearParams


            // Tableaux budgets & scrollview
            var tabScrollviewPicture: List<Int> = listOf(R.drawable.ic_launcher_background,
                R.drawable.ic_launcher_foreground,
                R.drawable.ic_launcher_background,
                R.drawable.ic_launcher_foreground,
                R.drawable.ic_launcher_background)

            var tabScrollViewImageView: MutableList<ImageView> = mutableListOf()

            // Ajout des budgets au scrollview
            for (i in 0..4){
                val image = ImageView(activity)
                val params1 = LinearLayout.LayoutParams(
                    ViewGroup.LayoutParams.MATCH_PARENT,
                    ViewGroup.LayoutParams.WRAP_CONTENT)
                image.layoutParams = params1
                image.setImageResource(tabScrollviewPicture[i])
                linearLayout.addView(image)
                tabScrollViewImageView.add(image)
            }
            horizontalScrollView.addView(linearLayout)

            relativeLayout.addView(horizontalScrollView)












        return root
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}