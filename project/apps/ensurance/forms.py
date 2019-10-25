from django import forms

from .models import Polis

class PolisForm(forms.ModelForm):
    polis_id = forms.CharField(max_length=100)
    sk_name = forms.CharField(max_length=100, required=False)

    class Meta:
        model = Polis
        fields = ['id', 'sk_name']
        fields_required = ['id']