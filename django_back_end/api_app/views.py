from django.shortcuts import render
from rest_framework import generics
from .models import User
from .serializers import UserSerializer
from rest_framework.permissions import IsAuthenticated


# List and create users (GET and POST)
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from .models import User
from .serializers import UserSerializer

class UserListCreateAPIView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        print("Authenticated user:", self.request.user)
        print("Claims:", getattr(self.request.user, 'claims', {}))
        return super().get_queryset()

    def perform_create(self, serializer):
        print("Authenticated user (POST):", self.request.user)
        print("Claims (POST):", getattr(self.request.user, 'claims', {}))
        return super().perform_create(serializer)




# Retrieve, update, and delete a single user (GET, PUT, DELETE)
class UserRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
