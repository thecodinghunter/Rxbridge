@echo off
setlocal enabledelayedexpansion

echo Cleaning Android build cache...
cd /d "%~dp0android"

if exist "build" (
    echo Removing build directory...
    rmdir /s /q "build" >nul 2>&1
)

if exist ".gradle" (
    echo Removing .gradle directory...
    rmdir /s /q ".gradle" >nul 2>&1
)

echo Running gradlew clean...
call gradlew clean

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✓ Gradle clean successful
    echo.
    echo Next steps:
    echo 1. Run: expo prebuild --clean
    echo 2. Then retry your build
) else (
    echo.
    echo ✗ Gradle clean failed
    exit /b 1
)

endlocal
pause
