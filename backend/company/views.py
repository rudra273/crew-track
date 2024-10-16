from rest_framework import status, generics, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CompanySerializer, UserRegisterSerializer
from .models import Company
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
import logging

logger = logging.getLogger(__name__)

# Now you can use all log levels:
# logger.debug("This is a debug message")
# logger.error("This is an error message")
# logger.critical("This is a critical message")


# User Registeration API
class UserRegisterView(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            user_data = {
                'user_id': user.id,
                'username': user.username
            }
            # Return response with tokens
            logger.info("User Registered Successfully")
            return Response({
                'user_data': user_data ,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_201_CREATED)
        logger.error("User Registration Failed")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#GET User

class UserDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            # Serialize user data
            return Response({
                'user_id': user.id,
                'username': user.username,
                'email': user.email
            }, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response(
                {"detail": "No User matches the given query."},
                status=status.HTTP_404_NOT_FOUND
            )


#POST API 
class CompanyCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user = self.request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
#GET API
class CompanyListView(generics.ListAPIView):
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Retrieve all Company records for the authenticated user
        return Company.objects.filter(user=self.request.user)

#GET by ID API
class CompanyDetailView(generics.RetrieveAPIView):
    serializer_class = CompanySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Retrieve a specific Company record for the authenticated user
        return Company.objects.filter(user=self.request.user)

