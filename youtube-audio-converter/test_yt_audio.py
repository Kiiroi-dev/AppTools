#!/usr/bin/env python3
"""Unit tests for yt_audio.py"""

import os
import pytest
import tempfile
from pathlib import Path
from unittest.mock import patch, MagicMock

from yt_audio import parse_timecode, format_timecode, sanitize_filename, download_and_convert


class TestParseTimecode:
    def test_none(self):
        assert parse_timecode(None) is None

    def test_seconds_int(self):
        assert parse_timecode("90") == 90.0

    def test_seconds_float(self):
        assert parse_timecode("90.5") == 90.5

    def test_mm_ss(self):
        assert parse_timecode("1:30") == 90.0

    def test_mm_ss_with_decimal(self):
        assert parse_timecode("1:30.5") == 90.5

    def test_hh_mm_ss(self):
        assert parse_timecode("1:23:00") == 4980.0

    def test_23_minutes(self):
        assert parse_timecode("23:00") == 1380.0

    def test_27_minutes(self):
        assert parse_timecode("27:00") == 1620.0

    def test_whitespace(self):
        assert parse_timecode("  1:30  ") == 90.0

    def test_invalid(self):
        with pytest.raises(ValueError):
            parse_timecode("1:2:3:4")


class TestFormatTimecode:
    def test_zero(self):
        assert format_timecode(0) == "00:00:00.000"

    def test_ninety(self):
        assert format_timecode(90) == "00:01:30.000"

    def test_with_hours(self):
        assert format_timecode(3661.5) == "01:01:01.500"


class TestSanitizeFilename:
    def test_removes_special_chars(self):
        assert sanitize_filename('a<b>c:d"e') == "a_b_c_d_e"

    def test_collapses_whitespace(self):
        assert sanitize_filename("hello   world") == "hello world"

    def test_truncates_long_names(self):
        name = "a" * 300
        assert len(sanitize_filename(name)) == 200


class TestDownloadAndConvert:
    def test_invalid_format(self):
        with pytest.raises(ValueError, match="Unsupported format"):
            download_and_convert("https://youtube.com/watch?v=test", output_format="xyz")

    def test_start_after_end(self):
        with pytest.raises(ValueError, match="must be before"):
            download_and_convert("https://youtube.com/watch?v=test", start="5:00", end="3:00")
