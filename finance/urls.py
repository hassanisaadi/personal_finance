from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import signup_view, login_view, institutions_view, create_account_view

router = DefaultRouter()
# router.register('bank-accounts', BankAccountViewSet)
# router.register('transactions', TransactionViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('signup/', signup_view, name='signup'),
    path('login/', login_view, name='login'),
    path('institutions/', institutions_view, name='institutions'),
    path('create-account/', create_account_view, name='create_account'),
]