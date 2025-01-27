from django.db import models

# Create your models here.

class BankAccount(models.Model):
    ACCOUNT_TYPES = (
        ('checking', 'Checking'),
        ('savings', 'Savings'),
        ('credit', 'Credit'),
    )

    name = models.CharField(max_length=255)
    institution = models.CharField(max_length=255)
    account_type = models.CharField(max_length=50, choices=ACCOUNT_TYPES)

    def __str__(self):
        return f"{self.name} ({self.institution})"

class Transaction(models.Model):
    TRANSACTION_TYPES = (
        ('cash', 'Cash'),
        ('bank', 'Bank'),
    )

    description = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_type = models.CharField(max_length=50, choices=TRANSACTION_TYPES)
    date = models.DateField()
    bank_account = models.ForeignKey(BankAccount, null=True, blank=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.description