from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from playground.models import Heros
from playground.serializers import HerosSerializer
from django.core.files.storage import default_storage

# Create your views here.


@csrf_exempt
def getNotes(request, id=0):
    if request.method == 'GET':
        heros = Heros.objects.all()
        heros_serializer = HerosSerializer(heros, many=True)
        return JsonResponse(heros_serializer.data, safe=False)
    elif request.method == 'POST':
        heros_data = JSONParser().parse(request)
        heros_serializer = HerosSerializer(data=heros_data)
        if heros_serializer.is_valid():
            heros_serializer.save()
            return JsonResponse(heros_serializer.data, safe=False)
        return JsonResponse("failed addition", safe=False)
    elif request.method == 'PUT':
        heros_data = JSONParser().parse(request)
        hero = Heros.objects.get(heroId=heros_data['heroId'])
        heros_serializer = HerosSerializer(hero, data=heros_data)
        if heros_serializer.is_valid():
            heros_serializer.save()
            return JsonResponse('updated', safe=False)
        return JsonResponse("update failed", safe=False)


@csrf_exempt
def heroDetail(request, heroId=0):
    if request.method == 'GET':
        hero = Heros.objects.get(heroId=heroId)
        heros_serializer = HerosSerializer(hero, many=False)
        return JsonResponse(heros_serializer.data, safe=False)
    elif request.method == 'DELETE':
        hero = Heros.objects.get(heroId=heroId)
        hero.delete()
        return JsonResponse("deleted", safe=False)


@csrf_exempt
def search(request, heroName):
    if request.method == 'GET':
        hero = Heros.objects.filter(heroName__contains=heroName)
        print(hero)
        if not hero:
            return JsonResponse("Not Found", safe=False)
        heros_serializer = HerosSerializer(hero, many=True)
    return JsonResponse(heros_serializer.data, safe=False)


@csrf_exempt
def saveFile(request):
    file = request.FILES['uploadedFile']
    file_name = default_storage.save(file.name, file)
    return JsonResponse(file_name, safe=False)
