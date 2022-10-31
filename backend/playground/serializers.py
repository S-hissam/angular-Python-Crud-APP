from rest_framework import serializers
from playground.models import Heros

class HerosSerializer(serializers.ModelSerializer):
  class Meta:
    model=Heros
    fields=('heroId','heroName','body')