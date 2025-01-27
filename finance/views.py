#from django.shortcuts import render

# Create your views here.
from rest_framework.viewsets import ModelViewSet
from .models import BankAccount, Transaction
from .serializers import BankAccountSerializer, TransactionSerializer

class BankAccountViewSet(ModelViewSet):
    queryset = BankAccount.objects.all()
    serializer_class = BankAccountSerializer

class TransactionViewSet(ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer