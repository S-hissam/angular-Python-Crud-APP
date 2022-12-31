from django.urls import path, re_path
from django.conf.urls.static import static
from django.conf import settings
from . import views

urlpatterns = [
    path("heros", views.getNotes),
    path('hero/<int:heroId>', views.heroDetail),
    path('search', views.search,),
    path('search/<str:heroName>', views.search),
    path('saveFile', views.saveFile),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
