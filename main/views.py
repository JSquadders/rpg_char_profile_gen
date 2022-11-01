import json

from django.http import HttpResponse
from django.shortcuts import render

from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def main_page(request):
	if request.method == 'POST':
		json_data = json.dumps({'perfil': 'Genérico demais, mano.', 'imagem': 'static/img/link.png'})
		return HttpResponse(json_data)
	else:
		return render(request, 'index.html')
