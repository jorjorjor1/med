from django.shortcuts import render
from django.http import HttpResponse
from django.db import connection
from .forms import PolisForm
from .models import Polis, Service
import json
from django.http import JsonResponse
from django.contrib import messages 



# Create your views here.
def main_view(request):
    cursor = connection.cursor()
    command = """ select sk_name from ensurance_polis"""
    cursor.execute(command)
    sk_names = cursor.fetchall()
    sk_names_filtred = []
    for i in sk_names: #заполняем поле с названиями СК
        target = str(i[0]).lstrip("('").rstrip("',)")
        if target in sk_names_filtred: pass
        else: sk_names_filtred.append(target)

    
    return render(request, 'main.html', {'sk_names_filtred':sk_names_filtred})

def search_services(request):
    if request.method == "POST":
        search_text = request.POST['search_text']
    else:
        search_text = ""
    
    services = Service.objects.filter(name__icontains=search_text)
    
    return render (request, 'ajax_search.html', {'services':services})


def ajax_view(request):
    cursor = connection.cursor()
    command = """ select sk_name from ensurance_polis"""
    cursor.execute(command)
    sk_names = cursor.fetchall()
    sk_names_filtred = []
    for i in sk_names: #заполняем поле с названиями СК
        target = str(i[0]).lstrip("('").rstrip("',)")
        if target in sk_names_filtred: pass
        else: sk_names_filtred.append(target)
    if request.method=="POST": #валидность формы сделана в js
        polis_id = request.POST['polis_id'] #
        #inp_value = request.POST.get('chosenQuestions', 'This is a default value') #получаем из ajax, в хтмл это скрытая форма
        #print(polis_id, inp_value)
        cursor = connection.cursor()
        command = """ select * from ensurance_polis where id = '%s'""" %(polis_id) #получаем кортеж в списке в котором все данные из БД по айди полиса[( , , , )]
        cursor.execute(command)
        result = cursor.fetchall()
        in_services = result[0][5].split() #сервисы включенные в этот полис_ид
        out_services = result[0][6].split() #сервисы невключенные в этот полис_ид
        inp_value = request.POST.get('chosenQuestions', 'This is a default value') # получаем сервисы, которые выбраны
        print('inp', inp_value)
        inp_value_list = []# складируется все, что написано в поиске услуг
        if inp_value != '':
            inp_value = tuple(inp_value.split(',')) # в переменной лежат названия услуг, форматируем их чтобы узнать айди
            if len(inp_value) == 1: #чистим, если одно значение в кортеже, чтобы не было лишних символов
                inp_value = str(inp_value)
                inp_value = inp_value.replace(',','')
                print(inp_value)
                inp_value_list.append(inp_value.lstrip("('").rstrip("',)"))#ненавижу запятые
            elif len(inp_value) > 1:
                for elem in inp_value:
                    print(elem)
                    inp_value_list.append(elem)
                 #тут тоже чистим - просто добвляем в лист

            command2 = """ select id, name from ensurance_service where name in {}""".format(inp_value) # получаем айди выбранных сервисов
            cursor.execute(command2)
            services_included = cursor.fetchall() # получаем [(id, name), (id, name), ...]
            print(inp_value_list, '0')
            services_chosen_ids = [] #сюда получаем [[id, name], [id, name], ...]
            services_included_html = []# все услуги которые включ, передаем в рендер
            services_excluded_html = []# все услуги которые выключ, передаем в рендер
            #services_unknown_html=[]# все что осталось, передаем в рендер
            for elem in services_included: # чистим айди и название услуги от лишних знаков
                local_dict = [elem[0], elem[1]]
                services_chosen_ids.append(local_dict)    

            for j in services_chosen_ids: 
                if j[1] in inp_value_list: #если есть совпадения из БД они удаляются, остается только то, чего нет в БД
                    inp_value_list.pop(inp_value_list.index(j[1]))
                else:pass
            for i in services_chosen_ids: # проверяем на вхождение в ин_сервисес и выводим в штмл
                service_id = str(i[0])
                try: #делим услуги на включ/ не включ
                    in_services.index(service_id)
                    services_included_html.append(i[1])
                    print(i[1], 'Включено')
                except:
                    services_excluded_html.append(i[1])
                    print(i[1], 'Не включено')
            print(inp_value_list, services_included_html, services_excluded_html)
            return render(request, 'polis_search.html', {'result':result, 'inp_value_list':inp_value_list, "sk_names_filtred":sk_names_filtred,'services_included_html':services_included_html, 'services_excluded_html':services_excluded_html})
        else:
            error_text_1 = 'Проверьте выбранные услуги и попробуйте заново'
            return render(request, 'polis_search.html', {'error_text_1':error_text_1, 'sk_names_filtred':sk_names_filtred})
