from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CompanySerializer
from .models import Company

import logging

logger = logging.getLogger(__name__)

# Now you can use all log levels:
logger.debug("This is a debug message")
logger.info("This is an info message")
logger.warning("This is a warning message")
logger.error("This is an error message")
logger.critical("This is a critical message")


#POST API 
class CompanyCreateView(APIView):
    def post(self, request):
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#GET API
class CompanyListView(generics.ListAPIView):
    queryset = Company.objects.all()  # Retrieve all Company records
    serializer_class = CompanySerializer

#GET by ID API
class CompanyDetailView(generics.RetrieveAPIView):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer

    