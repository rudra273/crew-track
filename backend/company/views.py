from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CompanySerializer
from .models import Company


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
