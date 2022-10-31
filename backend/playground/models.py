from django.db import models

# Create your models here.
class Heros(models.Model):
    heroId = models.AutoField(primary_key=True)
    heroName = models.CharField(max_length=100)
    body = models.CharField(max_length=500)
