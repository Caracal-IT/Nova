# Build runtime image
FROM microsoft/aspnetcore:2.0
WORKDIR /app
COPY ./bin/Release/netcoreapp2.0/publish ./
ENTRYPOINT ["dotnet", "Caracal.Web.Nova.Builder.dll"]