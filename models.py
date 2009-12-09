from django.db.models import *

class Test(Model):
  """
  [Test(name=name, age=age).save() for (name, age) in [('Bill', 26), ('Spot', 1), ('Fred', 63), ('Big Pete', 65), ('Cool Sue', 28), ('Poppa Joe', 12), ('Grams', 87), ('Steve', 32), ('Nadine', 47), ('Al', 22), ('Jim', 33), ('Pam', 31), ('Jan', 40), ('Laura', 45), ('Anne', 15)]] 
  """

  name = CharField(max_length=25)
  age = IntegerField()


