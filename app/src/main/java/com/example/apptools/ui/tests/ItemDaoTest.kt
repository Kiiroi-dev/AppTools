/*
package com.example.apptools.ui.tests

import androidx.room.Room

import org.junit.Before

import androidx.arch.core.executor.testing.InstantTaskExecutorRule
import androidx.test.ext.junit.runners.AndroidJUnit4

import org.junit.Rule
import org.junit.internal.runners.JUnit38ClassRunner

import org.junit.runner.RunWith


@RunWith(AndroidJUnit4::class)
@LargeTest
class ItemDaoTest {
    // FOR DATA
    private var database: SaveMyTripDatabase? = null

    @Rule
    var instantTaskExecutorRule: InstantTaskExecutorRule = InstantTaskExecutorRule()
    @Before
    @Throws(Exception::class)
    fun initDb() {
        database = Room.inMemoryDatabaseBuilder(
            InstrumentationRegistry.getContext(),
            SaveMyTripDatabase::class.java
        )
            .allowMainThreadQueries()
            .build()
    }

    @After
    @Throws(Exception::class)
    fun closeDb() {
        database.close()
    }
}*/
