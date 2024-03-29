# Generated by Django 2.2.6 on 2019-10-16 18:36

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Polis',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('tel', models.CharField(max_length=500, verbose_name='телефон страховой')),
                ('sk_name', models.CharField(max_length=200, verbose_name='Имя страховой')),
                ('type', models.CharField(max_length=200, verbose_name='Тип страховки')),
                ('date_end', models.CharField(max_length=200, verbose_name='Конец действия полиса')),
                ('inservice', models.CharField(max_length=200, verbose_name='Входящие услуги')),
                ('notservice', models.CharField(max_length=200, verbose_name='Не входящие услуги')),
            ],
        ),
    ]
