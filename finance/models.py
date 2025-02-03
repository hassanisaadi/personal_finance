from django.db import models
from django.contrib.auth.models import User

class Institution(models.Model):
    name = models.CharField(max_length=100)
    logo_url = models.URLField(blank=True, null=True)  # URL to the institution’s logo

    def __str__(self):
        return self.name

class FinancialAccount(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='financial_accounts', null=True)
    institution = models.ForeignKey(Institution, on_delete=models.CASCADE, related_name='accounts', null=True)
    account_name = models.CharField(max_length=100, null=True)
    account_type = models.CharField(max_length=50, blank=True, null=True)
    monthly_fee = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    annual_fee = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    interest = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    overdraft_limit = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    cash_back = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    credit_limit = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    currency = models.CharField(max_length=10, blank=True, null=True)
    current_balance = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return self.account_name



# from django.db import models

# # Create your models here.

# class BankAccount(models.Model):
#     ACCOUNT_TYPES = (
#         ('checking', 'Checking'),
#         ('savings', 'Savings'),
#         ('credit', 'Credit'),
#     )

#     name = models.CharField(max_length=255)
#     institution = models.CharField(max_length=255)
#     account_type = models.CharField(max_length=50, choices=ACCOUNT_TYPES)

#     def __str__(self):
#         return f"{self.name} ({self.institution})"

# class Transaction(models.Model):
#     TRANSACTION_TYPES = (
#         ('cash', 'Cash'),
#         ('bank', 'Bank'),
#     )

#     description = models.CharField(max_length=255)
#     amount = models.DecimalField(max_digits=10, decimal_places=2)
#     transaction_type = models.CharField(max_length=50, choices=TRANSACTION_TYPES)
#     date = models.DateField()
#     bank_account = models.ForeignKey(BankAccount, null=True, blank=True, on_delete=models.CASCADE)

#     def __str__(self):
#         return self.description