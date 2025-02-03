#from django.shortcuts import render

# Create your views here.
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework.viewsets import ModelViewSet
from .models import Institution, FinancialAccount

#from .models import BankAccount, Transaction
#from .serializers import BankAccountSerializer, TransactionSerializer

# class BankAccountViewSet(ModelViewSet):
#     queryset = BankAccount.objects.all()
#     serializer_class = BankAccountSerializer

# class TransactionViewSet(ModelViewSet):
#     queryset = Transaction.objects.all()
#     serializer_class = TransactionSerializer

@csrf_exempt
def signup_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        confirm_password = data.get('confirmPassword')

        if password != confirm_password:
            return JsonResponse({'error': 'Passwords do not match.'}, status=400)

        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already exists.'}, status=400)
        if User.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email already exists.'}, status=400)

        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()

        # Automatically authenticate and log in the user
        user = authenticate(username=username, password=password)
        if user:
            login(request, user)
            return JsonResponse({'message': 'User created successfully.', 'token': 'dummy_token', 'user_id': user.id})

        return JsonResponse({'error': 'Authentication failed.'}, status=400)

    return JsonResponse({'error': 'Invalid request method.'}, status=405)

@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email')
        password = data.get('password')
        
        # Retrieve the user by email (Django default uses username for authentication)
        try:
            user_obj = User.objects.get(email=email)
            username = user_obj.username
        except User.DoesNotExist:
            return JsonResponse({'error': 'Invalid email or password.'}, status=400)
        
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'message': 'Login successful.'})
        else:
            return JsonResponse({'error': 'Invalid email or password.'}, status=400)
    
    return JsonResponse({'error': 'Invalid request method.'}, status=405)

def institutions_view(request):
    """GET endpoint to list all institutions."""
    if request.method == 'GET':
        institutions = Institution.objects.all()
        data = []
        for inst in institutions:
            data.append({
                'id': inst.id,
                'name': inst.name,
                'logo_url': inst.logo_url,
            })
        return JsonResponse({'institutions': data})
    return JsonResponse({'error': 'Invalid request method.'}, status=405)

@csrf_exempt
def create_account_view(request):
    """POST endpoint to create a new financial account."""
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            # In a production app, use authentication tokens; here we assume user_id is sent.
            user_id = data.get('user_id')
            institution_id = data.get('institution_id')
            account_data = data.get('account_data', {})

            if not user_id or not institution_id:
                return JsonResponse({'error': 'User ID and Institution ID are required.'}, status=400)
            
            account_name = account_data.get('account_name')
            if not account_name:
                return JsonResponse({'error': 'Account name is required.'}, status=400)

            try:
                user = User.objects.get(id=user_id)
            except User.DoesNotExist:
                return JsonResponse({'error': 'User does not exist.'}, status=400)
            
            try:
                institution = Institution.objects.get(id=institution_id)
            except Institution.DoesNotExist:
                return JsonResponse({'error': 'Institution does not exist.'}, status=400)
            
            account = FinancialAccount.objects.create(
                user=user,
                institution=institution,
                account_name=account_name,
                account_type=account_data.get('account_type'),
                monthly_fee=account_data.get('monthly_fee'),
                annual_fee=account_data.get('annual_fee'),
                interest=account_data.get('interest'),
                overdraft_limit=account_data.get('overdraft_limit'),
                cash_back=account_data.get('cash_back'),
                credit_limit=account_data.get('credit_limit'),
                description=account_data.get('description'),
                currency=account_data.get('currency'),
                current_balance=account_data.get('current_balance'),
            )
            account.save()
            return JsonResponse({'message': 'Account created successfully.'})
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    return JsonResponse({'error': 'Invalid request method.'}, status=405)

