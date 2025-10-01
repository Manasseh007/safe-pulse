from rest_framework import serializers
from .models import CustomUser
from .models import SecurityCompany
from django.contrib.auth import authenticate
from .models import EmergencyAlert
from .models import Alert


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['phone_number', 'full_name', 'password', 'emergency_contact']

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            phone_number=validated_data['phone_number'],
            full_name=validated_data.get('full_name', ''),
            password=validated_data['password'],
            emergency_contact=validated_data.get('emergency_contact', '')
        )
        return user

class UserLoginSerializer(serializers.Serializer):
    phone_number = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        phone_number = data.get('phone_number')
        password = data.get('password')

        if phone_number and password:
            user = authenticate(username=phone_number, password=password)
            if user:
                data['user'] = user
            else:
                raise serializers.ValidationError("Invalid credentials.")
        else:
            raise serializers.ValidationError("Must include phone number and password.")

        return data


class SecurityCompanyRegisterSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    company_name = serializers.CharField()
    location = serializers.CharField()
    phone_number = serializers.CharField()

    def create(self, validated_data):
        from django.contrib.auth.models import User
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password']
        )
        security_company = SecurityCompany.objects.create(
            user=user,
            company_name=validated_data['company_name'],
            location=validated_data['location'],
            phone_number=validated_data['phone_number']
        )
        return user


class SecurityCompanyLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        from django.contrib.auth import authenticate
        user = authenticate(username=data['username'], password=data['password'])
        if not user:
            raise serializers.ValidationError("Invalid credentials")
        # Check if user has associated SecurityCompany
        if not hasattr(user, 'securitycompany'):
            raise serializers.ValidationError("User is not a security company")
        return {'user': user}

class EmergencyAlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmergencyAlert
        fields = ['id', 'user', 'location', 'timestamp', 'is_active']
        
class AlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alert
        fields = '__all__'