import unittest

class TestSanity(unittest.TestCase):

    def test_true(self):
        self.assertEqual(True, True)


if __name__ == '__main__':
    unittest.main()