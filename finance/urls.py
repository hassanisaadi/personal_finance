from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BankAccountViewSet, TransactionViewSet

router = DefaultRouter()
router.register('bank-accounts', BankAccountViewSet)
router.register('transactions', TransactionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]