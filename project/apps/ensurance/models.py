from django.db import models
from django.conf import settings


# Create your models here.


class Polis (models.Model):
    tel = models.CharField('телефон страховой', max_length = 500)
    sk_name = models.CharField('Имя страховой', max_length = 200)
    type = models.CharField('Тип страховки', max_length = 200)
    date_end = models.CharField('Конец действия полиса', max_length = 200)
    polis_id = models.CharField('ID полиса', max_length=200), 'primary_key = True'
    inservice = models.CharField("Входящие услуги", max_length=200)
    notservice = models.CharField("Не входящие услуги", max_length=200)



    def __str__(self):
        return self.id

class Service (models.Model):
    id = models.IntegerField('ID услуги', max_length=200), 'primary_key = True'
    name = models.CharField('Название услуги', max_length = 200)

    def __str__(self):
            return self.name