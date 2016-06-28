clear all
close all
clc

filename = 'Result_1_pH.dat';
M = csvread(filename);

waterLevel = M(:,1);
temperature = M(:,2);
pH = M(:,3);

alarmStatus = M(:,4:9);

actuatorStatus = M(:,10:15);

pumpIn = actuatorStatus(:,1);
pumpOut = actuatorStatus(:,2);
heater = actuatorStatus(:,3);
CO2 = actuatorStatus(:,6);

%figure('units','normalized','outerposition',[0 0 1 1])
figure

plot(pH/10,'Marker','o','Color','black', 'LineWidth', 2);

axis tight

%title({'Ensayo de Control de Alarma'; 'Temperatura'; ' '},'FontName', 'Arial','FontSize', 24);

xlabel('Número de adquisición', 'FontName', 'Arial','FontSize', 18);
ylabel('pH', 'FontName', 'Arial','FontSize', 18);

set(gcf,'units','normalized','outerposition',[0 0 1 1])
hold on
grid on
grid minor

% stairs([a,a(end)]);
stairs(pumpIn,'LineWidth',1.5,'Marker','o','Color','g');
stairs(pumpOut+1.5,'LineWidth',1.5,'Marker','o','Color','b');
stairs(CO2+3,'LineWidth',1.5,'Marker','o','Color','m');

plot(xlim,[7.5 7.5],'--','Color','r');
plot(xlim,[6.5 6.5],'--','Color','b');

h_legend = legend('pH', 'Bomba de Entrada', 'Bomba de Salida', 'Bomba de CO2','Umbral alto','Umbral bajo','Location','northeastoutside');
set(h_legend,'FontSize',14);

set(gcf, 'PaperPositionMode', 'manual');
set(gcf, 'PaperUnits', 'inches');
set(gcf, 'PaperPosition', [2.5 2.5 20 10]); % last 2 are width/height.

print('plotpH','-depsc2')
hold off
