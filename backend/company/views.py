# from rest_framework import status, generics, permissions
# from rest_framework.response import Response
# from rest_framework.views import APIView
# from .serializers import CompanySerializer
# from .models import Company
# import logging

# logger = logging.getLogger(__name__)


# #POST API 
# class CompanyCreateView(APIView):
#     permission_classes = [permissions.IsAuthenticated]
#     def post(self, request):
#         serializer = CompanySerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(user = self.request.user)
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# #GET API
# class CompanyListView(generics.ListAPIView):
#     serializer_class = CompanySerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         # Retrieve all Company records for the authenticated user
#         return Company.objects.filter(user=self.request.user)

# #GET by ID API
# class CompanyDetailView(generics.RetrieveAPIView):
#     serializer_class = CompanySerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         # Retrieve a specific Company record for the authenticated user
#         return Company.objects.filter(user=self.request.user)


from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import Company
from .serializers import CompanySerializer
from django.shortcuts import get_object_or_404
import logging

logger = logging.getLogger(__name__)

class CompanyCreateView(generics.CreateAPIView):
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        logger.info(f"Company created: {serializer.instance.name} by user {self.request.user.username}")

class CompanyListView(generics.ListAPIView):
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        logger.info(f"Retrieving companies for user {self.request.user.username}")
        return Company.objects.filter(user=self.request.user)

class CompanyDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        obj = get_object_or_404(Company, id=self.kwargs['pk'], user=self.request.user)
        logger.info(f"Accessing company: {obj.name} by user {self.request.user.username}")
        return obj

    def perform_update(self, serializer):
        serializer.save()
        logger.info(f"Company updated: {serializer.instance.name} by user {self.request.user.username}")

    def perform_destroy(self, instance):
        logger.info(f"Company deleted: {instance.name} by user {self.request.user.username}")
        instance.delete() 

        