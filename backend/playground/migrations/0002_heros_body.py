# Generated by Django 4.1.2 on 2022-10-31 15:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('playground', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='heros',
            name='body',
            field=models.CharField(default=1, max_length=500),
            preserve_default=False,
        ),
    ]
